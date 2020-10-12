import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
export type ResourceImageFragmentFragment = { __typename?: "Image" } & Pick<
  Types.Image,
  "path" | "url"
>;

export const ResourceImageFragmentFragmentDoc = gql`
  fragment ResourceImageFragment on Image {
    path
    url
  }
`;
