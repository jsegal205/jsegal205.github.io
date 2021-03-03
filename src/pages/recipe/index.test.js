import React from "react";
import renderer from "react-test-renderer";

import { adminUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import Recipe from "./index";

jest.mock("../../utils/useFetch", () => jest.fn());

describe("Recipe Component", () => {
  const baseUrl = `${adminUrlBase}/recipes`;

  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      const slug = "doesNotExist";
      const props = {
        location: {
          pathname: slug,
        },
      };

      useFetch.mockReturnValue({
        loading: true,
        data: {},
      });

      const tree = renderer.create(<Recipe {...props} />);
      expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/${slug}`);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    describe("with 404 status", () => {
      it("displays `Not Found`", () => {
        const slug = "doesNotExist";
        const props = {
          location: {
            pathname: slug,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: { status: 404 },
        });

        const tree = renderer.create(<Recipe {...props} />);
        expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/${slug}`);
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    describe("with 500 status", () => {
      it("displays error message", () => {
        const slug = "serverError";
        const props = {
          location: {
            pathname: slug,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: { error: "server likely on fire", status: 500 },
        });

        const tree = renderer.create(<Recipe {...props} />);
        expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/${slug}`);
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    describe("with 200 status", () => {
      it("displays data", () => {
        const slug = "valid-slug";
        const props = {
          location: {
            pathname: slug,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: {
            title: "title",
            slug,
            referenceLink: "referenceLink",
            ingredients: "ingredients",
            directions: "directions",
            notes: "notes",
            status: 200,
          },
        });

        const tree = renderer.create(<Recipe {...props} />);
        expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/${slug}`);
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    it("displays data with valid null fields", () => {
      const slug = "valid-null-fields-slug";
      const props = {
        location: {
          pathname: slug,
        },
      };

      useFetch.mockReturnValue({
        loading: false,
        data: {
          title: "title",
          slug,
          referenceLink: null,
          ingredients: "ingredients",
          directions: "directions",
          notes: null,
          status: 200,
        },
      });

      const tree = renderer.create(<Recipe {...props} />);
      expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/${slug}`);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("getSlug", () => {
    describe("when props contain state.slug", () => {
      it("pulls slug from state", () => {
        const props = {
          location: {
            state: {
              slug: "state-slug",
            },
            pathname: "pathname-slug",
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(<Recipe {...props} />);
        expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/state-slug`);
      });
    });
    describe("when props do not contain state.slug", () => {
      it("pulls slug from pathname", () => {
        const props = {
          location: {
            state: {
              "not-a-slug": "state-slug",
            },
            pathname: "pathname-slug",
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(<Recipe {...props} />);
        expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/pathname-slug`);
      });
    });

    describe("when pathname contains `/`", () => {
      it("splits on `/` and takes last value", () => {
        const props = {
          location: {
            state: {
              "not-a-slug": "state-slug",
            },
            pathname: "/this/is/a/slash-slug",
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(<Recipe {...props} />);
        expect(useFetch).toHaveBeenCalledWith(`${baseUrl}/slash-slug`);
      });
    });
  });
});
