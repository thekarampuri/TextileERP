# ERPTextile — Product Blueprint

> **Note to AI assistants (Claude Code / Claude in chat):** This is the source of truth for module structure, roles, and workflows for this project. Before generating schema, API routes, or UI for any module, check this document. If a request conflicts with this spec, flag the conflict instead of silently deviating.

---

## 1. Roles

| Role | Who they are | Primary concern |
|---|---|---|
| **Owner** | Mill owner | Money, overall throughput, big-picture decisions |
| **Manager** | Floor/production manager | Day-to-day production, scheduling, dispatch readiness |
| **Textile Designer** | Pattern/motif specialist | Design specs, weave parameters, sampling |
| **HR / Accountant** | Office staff (often one person at this scale) | Attendance, payroll, invoicing, customer payments |
| **Employee / Operator** | Machine operators, floor workers | Their assigned job, daily output, attendance |

At Solapur-mill scale, one person often wears 2 roles (e.g., owner = manager, or accountant = HR). The permission system should support a user having multiple roles, not force a strict 1:1.

---

## 2. Full Page List

```
ERPTextile
│
├── Dashboard                     [Owner, Manager — role-specific views]
│
├── Customers
│   ├── Customer List
│   ├── Customer Detail            (profile, order history, ledger/balance)
│   └── Add/Edit Customer
│
├── Orders
│   ├── Order List
│   ├── Create Order               (customer + order items + design + delivery date)
│   ├── Order Detail                (timeline, items, status, linked production jobs)
│   └── Order Items                 (fabric type, qty, specs, design ref, price)
│
├── Designs                        [Textile Designer's home]
│   ├── Design Library              (motif/pattern catalog)
│   ├── Create/Upload Design        (warp count, weft count, reed, pick, repeat)
│   └── Design Approval Queue
│
├── Production                     [The core module — your USP]
│   ├── Production Board            (kanban: Warping → Weaving → Finishing → Packing → Dispatch)
│   ├── Job Detail                  (linked order item, machine, operator, logs)
│   ├── Daily Output Entry          (meters/pieces produced, hours run, downtime)
│   └── Job Schedule / Planner
│
├── Machines
│   ├── Machine List                (status: running/idle/maintenance)
│   ├── Machine Detail              (utilization history, current job)
│   └── Maintenance Log
│
├── Inventory
│   ├── Raw Materials               (yarn, dyes, chemicals — stock levels)
│   ├── Finished Goods              (ready-for-dispatch stock)
│   └── Stock Transactions          (in/out ledger, linked to production & dispatch)
│
├── Employees                       [HR/Accountant's home]
│   ├── Employee List
│   ├── Attendance                  (daily, can be marked by employee or HR)
│   └── Payroll                     (basic — monthly calc from attendance)
│
├── Dispatch
│   ├── Dispatch List
│   ├── Create Dispatch             (linked order, transport details, packing slip)
│   └── Delivery Tracking           (dispatched / in-transit / delivered)
│
├── Reports
│   ├── Production Reports          (output by machine/operator/stage)
│   ├── Sales Reports               (orders, revenue by customer)
│   └── Inventory Reports           (consumption, stock aging)
│
└── Settings
    ├── Company Profile
    ├── Users & Roles
    ├── Production Stages Config    (DB-driven — add/reorder/rename stages)
    └── Notifications
```

---

## 3. Role → Page Access Matrix

| Page | Owner | Manager | Designer | HR/Accountant | Employee |
|---|:---:|:---:|:---:|:---:|:---:|
| Dashboard | Full | Production view | — | Financial view | — |
| Customers | View | View/Edit | — | View/Edit (ledger) | — |
| Orders | View | Create/Edit | View (design refs only) | View (for invoicing) | — |
| Designs | View | View | Create/Edit | — | — |
| Production Board | View | Full | — | — | View own jobs |
| Daily Output Entry | — | View all | — | — | Create (own job only) |
| Machines | View | Full | — | — | View assigned |
| Inventory | View | Full | — | View (for costing) | — |
| Employees | View | View | — | Full | View own profile |
| Attendance | View | View | — | Full | Mark own |
| Dispatch | View | Full | — | View (for invoicing) | — |
| Reports | Full | Production reports | — | Sales/inventory reports | — |
| Settings | Full | — | — | — | — |

---

## 4. Order Lifecycle — Step by Step

### Stage 1: Order Registration
**Who:** Manager or HR/Accountant (on customer call/visit)
- Select existing customer or create new one
- Add order item(s): fabric type, design/motif reference, quantity (meters/pieces), specs (width, color, GSM), delivery date, agreed price
- Order status: `draft` → `confirmed`

### Stage 2: Design Assignment
**Who:** Textile Designer
- If order references an existing design → link it directly, skip to Stage 3
- If custom design needed → Designer creates pattern, sets technical weave parameters (warp count, weft count, reed, pick, repeat size), uploads reference image
- Design status: `pending` → `approved` (Manager or Owner sign-off before production starts)

### Stage 3: Production Planning
**Who:** Manager
- Once order is `confirmed` and design is `approved` → Manager creates one `production_job` per order item
- Assigns machine + operator
- Sets planned start date
- Order status updates: `in_production`

### Stage 4: Production Execution
**Who:** Employee/Operator
- Operator starts the job → job enters **Warping** stage
- Daily output entry: meters/pieces produced, machine hours run, downtime reason (if any)
- Operator can **pause** (breakdown, material shortage) and **resume**
- Job moves through stages in order: `Warping → Weaving → Finishing → Packing`
- Each stage transition is logged in `production_logs` with timestamp + who made the change

### Stage 5: Quality Check
**Who:** Manager (or designated QC person)
- Verify finished goods against design spec before marking Packing complete
- Reject → sends job back to Weaving with a note; Accept → proceeds

### Stage 6: Inventory Update
**Automatic, triggered by production events:**
- Raw material consumed → deducted via `inventory_transactions` (linked to job)
- Finished goods → added to inventory as dispatch-ready stock

### Stage 7: Dispatch
**Who:** Manager or HR/Accountant
- Create dispatch entry linked to the order
- Generate packing slip
- Record transport details (vehicle, driver, transporter name)
- Order status: `dispatched` → `delivered` (once confirmed)

### Stage 8: Accounting Close-out
**Who:** HR/Accountant
- Generate invoice from the order
- Record payment status (pending/partial/paid)
- Update customer ledger/balance

---

## 5. Status State Machines

**Order status:**
```
draft → confirmed → in_production → quality_check → ready_to_dispatch → dispatched → delivered
                                                                                    ↘ (payment tracked separately)
```

**Production job stage:**
```
warping → weaving → finishing → packing → dispatch
   ↕ (pause/resume possible at any stage)
```

**Design status:**
```
pending → approved (or → rejected → revised → pending)
```

---

## 6. Daily HR Thread (runs parallel to order flow)

- Employees mark their own attendance (or HR marks it for floor staff without app access — common at this scale)
- Operators' daily output entries double as a production diary
- HR/Accountant runs monthly payroll calculation from attendance + any output-linked incentives (if applicable later)

---

## 7. Open Decisions (flag these to the user, don't assume)

- Whether payment tracking is a separate `payments` table or just a status field on `orders` initially
- Whether QC rejection sends the job back to a specific prior stage or just flags it for rework within the current stage
- Whether one `production_job` = one order item, or jobs can span multiple order items (current assumption: 1:1)