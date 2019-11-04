import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "3rem",
      }}
    >
      <div>© {new Date().getFullYear()}</div>
      <div>
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Twitter</strong>
        </a>
        {" : "}
        <a
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Github</strong>
        </a>
      </div>
    </footer>
  )
}

export default Footer
