import { vi } from "vitest";

describe("Navbar", () => {
    it("shows Home, Movies and Login when user is not authenticated", () => {
        vi.mock("../features/auth/hooks/useAuth", () => ({
        useAuth: () => ({
            user: null,
            loading: false,
            logout: vi.fn(),
        }),
        }));
    });
});