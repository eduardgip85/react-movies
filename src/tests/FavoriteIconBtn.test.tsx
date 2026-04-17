import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteIconBtn from "../features/favorites/components/FavoriteIconBtn";
import { vi } from "vitest";

describe("FavoriteIconBtn", () => {
    it("calls onClick when pressed", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<FavoriteIconBtn isFavorite={false} onClick={onClick} />);

        await user.click(
            screen.getByRole("button", { name: /add to favorites/i })
        );

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("shows remove label when movie is already favorite", () => {
        render(<FavoriteIconBtn isFavorite={true} onClick={() => {}} />);

        expect(
            screen.getByRole("button", { name: /remove from favorites/i })
        ).toBeInTheDocument();
    });
});