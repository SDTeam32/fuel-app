import SignUp from "../components/Signup";
import { useForm } from "react-hook-form";
import bcrypt, { compareSync } from "bcryptjs";
// import { supabase } from "../utils/supabase/server";
import { useRouter } from "next/navigation";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../utils/supabase/server", () => ({
  supabase: {
    from: () => ({
      insert: jest.fn(() => Promise.resolve({ data: { id: 1 }, error: null })),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(() => Promise.resolve({ data: null, error: null })),
    }),
  },
}));

jest.mock("../hooks/useUser", () => ({
  useUser: () => ({
    setUserNumber: jest.fn(),
    setUserID: jest.fn(),
    setLoggedIn: jest.fn(),
  }),
}));

jest.mock("bcryptjs", () => ({
  hashSync: jest.fn().mockReturnValue("hashed_password"),
}));

describe("SignUp Component", () => {
  it("does not render when show is false", () => {
    render(<SignUp show={false} onClose={jest.fn()} onSuccess={jest.fn()} />);
    expect(screen.queryByTestId("backdrop")).not.toBeInTheDocument();
  });

  it("renders when show is true", () => {
    render(<SignUp show={true} onClose={jest.fn()} onSuccess={jest.fn()} />);
    expect(screen.getByTestId("backdrop")).toBeInTheDocument();
  });

  it("closes modal on close button click", async () => {
    const onCloseMock = jest.fn();
    render(<SignUp show={true} onClose={onCloseMock} onSuccess={jest.fn()} />);
    fireEvent.click(screen.getByTestId("close-modal-button"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("shows validation errors for empty fields", async () => {
    render(<SignUp show={true} onClose={jest.fn()} onSuccess={jest.fn()} />);
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Required.")).toBeInTheDocument();
    });
  });

  it("shows a mismatch password error", async () => {
    render(<SignUp show={true} onClose={jest.fn()} onSuccess={jest.fn()} />);
    fireEvent.input(screen.getByTestId("password"), { target: { value: "password123" } });
    fireEvent.input(screen.getByTestId("password2"), { target: { value: "different" } });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Your passwords do not match")).toBeInTheDocument();
    });
  });

  it("submits valid data and calls onSuccess", async () => {
    const onSuccessMock = jest.fn();
    render(<SignUp show={true} onClose={jest.fn()} onSuccess={onSuccessMock} />);

    fireEvent.input(screen.getByTestId("username"), { target: { value: "new_user" } });
    fireEvent.input(screen.getByTestId("password"), { target: { value: "password123" } });
    fireEvent.input(screen.getByTestId("password2"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });
});
