import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import useFetch from "./useFetch";

describe("UTILS - useFetch", () => {
  const initialValue = [];
  const mock = new MockAdapter(axios);
  const url = "http://mock";

  describe("performs GET request", () => {
    describe("with 200 response", () => {
      it("updates loading value, returns data", async () => {
        const mockData = { message: "response" };
        mock.onGet(url).reply(200, mockData);

        const { result, waitForNextUpdate } = renderHook(() =>
          useFetch(url, initialValue)
        );

        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current.data).toEqual({ message: "response" });
        expect(result.current.loading).toBeFalsy();
      });
    });

    describe("with 4XX response", () => {
      it("updates loading value, returns status", async () => {
        const mockData = { error: "not found" };

        mock.onGet(url).reply(404, mockData);

        const { result, waitForNextUpdate } = renderHook(() =>
          useFetch(url, initialValue)
        );

        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current.data).toEqual({
          error: "Request failed with status code 404",
          status: 404,
        });
        expect(result.current.loading).toBeFalsy();
      });
    });

    describe("with 5XX response", () => {
      it("updates loading value, returns status", async () => {
        const mockData = { error: "server broke" };

        mock.onGet(url).reply(500, mockData);

        const { result, waitForNextUpdate } = renderHook(() =>
          useFetch(url, initialValue)
        );

        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current.data).toEqual({
          error: "Request failed with status code 500",
          status: 500,
        });
        expect(result.current.loading).toBeFalsy();
      });
    });
  });
});
