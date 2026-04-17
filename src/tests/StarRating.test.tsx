import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "../features/favorites/components/StarRating";
import { vi } from "vitest";

describe("StarRating", () => {
    it("renders five stars", () => {
        render(<StarRating value={3} onChange={() => {}} />);

        expect(screen.getAllByText("★")).toHaveLength(5);
    });

    it("calls onChange with the selected rating", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(<StarRating value={null} onChange={onChange} />);

        const stars = screen.getAllByText("★");
        await user.click(stars[3]);

        expect(onChange).toHaveBeenCalledWith(4);
    });
});