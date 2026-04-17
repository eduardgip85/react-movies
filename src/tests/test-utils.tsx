//envolver componentes con providers globales
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement, ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: Providers });
}