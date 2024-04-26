import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";
import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useUser";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// All mocks at the top
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("../hooks/useUser", () => ({
  useUser: jest.fn(),
}));

jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "mocked-class-name" }),
}));

jest.mock("../components/Navigation", () => {
  return function DummyNavigation() {
    return <div>Navigation</div>;
  };
});

jest.mock("../components/HydrationZustand", () => {
  return function DummyHydrationZustand({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
  };
});

describe("RootLayout", () => {
  const mockRouterPush = jest.fn();
  const mockUser = { isLoggedIn: true };

  beforeEach(() => {
    (useUser as unknown as jest.Mock).mockReturnValue(mockUser);
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it("should render Navigation when not on the information page", () => {
    (usePathname as jest.Mock).mockReturnValue("/some-other-page");

    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );

    expect(screen.getByText(/child content/i)).toBeInTheDocument();
    expect(screen.getByText(/Navigation/i)).toBeInTheDocument();
  });

  it("should not render Navigation when on the information page", () => {
    (usePathname as jest.Mock).mockReturnValue("/information");

    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );

    expect(screen.getByText(/child content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Navigation/i)).toBeNull();
  });

  it("should redirect to home if user is not logged in", () => {
    (useUser as unknown as jest.Mock).mockReturnValue({ isLoggedIn: false });

    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );

    expect(mockRouterPush).toHaveBeenCalledWith("/"); // Redirect to home if user is not logged in
  });
});
