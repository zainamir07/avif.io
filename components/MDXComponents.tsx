import React from 'react'
import Link from '@components/Link'
import Heading from '@components/Blog/H'
import Checklist from '@components/Blog/Checklist'
import Image from '@components/Blog/Image'
import ContentTable from '@components/Blog/ContentTable'
import Syntax from '@components/Blog/Syntax'
// import Button from './Button'
// import CustomLink from './CustomLink'
// import Alert from './Alert'
// import ConclusionCard from './ConclusionCard'

const MDXComponents = {
  Link,
  Image,
  Checklist,
  code: Syntax,
  H: Heading,
}

export default MDXComponents
