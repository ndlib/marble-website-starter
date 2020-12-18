// Helper function to remove items where content is null, undefined, or empty string
export const dropEmpty = (arr) => {
  return arr.filter(o => {
    return (o.content !== null && o.content !== '' && o.content !== undefined)
  })
}

export const getOpenGraph = (url, title, description, image) => {
  return dropEmpty([
    {
      property: `og:url`,
      content: url,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:image`,
      content: image,
    },
    {
      property: `og:type`,
      content: `website`,
    },
  ])
}

export const getTwitter = (author, title, description, image) => {
  return dropEmpty([
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
    {
      name: `twitter:image`,
      content: image,
    },
  ])
}
