import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

export default () => {
  return (
    <footer style={{ marginTop: "3rem" }}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}
