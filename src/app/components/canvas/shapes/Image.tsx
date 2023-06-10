import { renderToString } from 'react-dom/server'
import { Image as KonvaImage } from 'react-konva'
import { FaBeer } from 'react-icons/fa'
import { GrDocumentCsv, GrColumns, GrTable } from 'react-icons/gr'
import { LuRows } from 'react-icons/lu'

type imageIconTypes = {
  iconName: string
}

function ImageIcon ({ iconName }: imageIconTypes) {
  const setImage = (IconComponent: React.ElementType) => {
    const svgString = renderToString(<IconComponent />)
    const image = new window.Image()
    image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`
    return <KonvaImage image={image} width={30} height={30} x={25} y={14} />
  }

  switch (iconName) {
    case 'GrDocumentCsv':
      return setImage(GrDocumentCsv)
    case 'GrColumns':
      return setImage(GrColumns)
    case 'LuRows':
      return setImage(LuRows)
    case 'GrTable':
      return setImage(GrTable)
    default:
      setImage(FaBeer)
  }
  return <></>
}

export default ImageIcon
