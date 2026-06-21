// Mock Authentication for frontend-first development
export const auth = async () => {
  return {
    user: {
      id: "mock-owner-id",
      name: "Demo Owner",
      email: "owner@mill.com",
      roles: ["OWNER"] // Change this to "MANAGER", "DESIGNER", etc. to test different views
    }
  }
}
