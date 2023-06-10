import { LoaderContainer, SvgBullet } from '@/components/Loader/Loader.styles'

export const Loader = () => {
  return (
    <LoaderContainer>
      <SvgBullet id="1" width="30" height="20">
        <circle id="c1" cx="10" cy="10" r="10" />
      </SvgBullet>
      <SvgBullet id="2" width="30" height="20">
        <circle id="c2" cx="10" cy="10" r="10" />
      </SvgBullet>
      <SvgBullet id="3" width="30" height="20">
        <circle id="c3" cx="10" cy="10" r="10" />
      </SvgBullet>
    </LoaderContainer>
  )
}
