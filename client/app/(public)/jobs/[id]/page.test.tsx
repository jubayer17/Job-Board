import { renderToStaticMarkup } from "react-dom/server";

const getJobById = jest.fn();
const getApplicationStatus = jest.fn();
const getSavedStatus = jest.fn();

jest.mock("./job-details-client", () => ({
    __esModule: true,
    default: () => null,
}));

jest.mock("@/lib/services/job", () => ({
    __esModule: true,
    getJobById: (...args: unknown[]) => getJobById(...args),
    getApplicationStatus: (...args: unknown[]) => getApplicationStatus(...args),
    getSavedStatus: (...args: unknown[]) => getSavedStatus(...args),
}));

jest.mock("next-auth", () => ({
    __esModule: true,
    getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({
    __esModule: true,
    authOptions: {},
}));

import JobPage from "./page";

describe("JobPage", () => {
    beforeEach(() => {
        getJobById.mockReset();
        getApplicationStatus.mockReset();
        getSavedStatus.mockReset();
    });

    it("renders a user-friendly error when no job id is provided", async () => {
        const element = await JobPage({ params: { id: undefined } });
        const html = renderToStaticMarkup(element as unknown as React.ReactElement);

        expect(html).toContain("Invalid job link");
        expect(html).toContain("No job ID was provided in the URL.");
        expect(getJobById).not.toHaveBeenCalled();
    });

    it("renders a user-friendly error when job id is empty/null-ish", async () => {
        const element = await JobPage({ params: { id: "null" } });
        const html = renderToStaticMarkup(element as unknown as React.ReactElement);

        expect(html).toContain("Invalid job link");
        expect(getJobById).not.toHaveBeenCalled();
    });

    it("renders a user-friendly error when job id is malformed", async () => {
        const element = await JobPage({ params: { id: "not-a-uuid" } });
        const html = renderToStaticMarkup(element as unknown as React.ReactElement);

        expect(html).toContain("Invalid job ID format");
        expect(getJobById).not.toHaveBeenCalled();
    });

    it("passes the URL job id into the data fetch layer when valid", async () => {
        getJobById.mockResolvedValue(null);

        const element = await JobPage({ params: { id: "550e8400-e29b-41d4-a716-446655440000" } });
        const html = renderToStaticMarkup(element as unknown as React.ReactElement);

        expect(getJobById).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440000");
        expect(html).toContain("Job not found");
    });
});

