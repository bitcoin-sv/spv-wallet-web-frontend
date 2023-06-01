import { Header } from '@/components/_layout/Header'
import { Footer } from '@/components/_layout/Footer'
import { Main } from '@/components/_layout/Main'
import { FC, ReactNode } from 'react'
import { Row } from '@/styles/grid'

type PageWrapperProps = {
  children: ReactNode
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Row>{children}</Row>
      </Main>
      <Footer />
    </>
  )
}
