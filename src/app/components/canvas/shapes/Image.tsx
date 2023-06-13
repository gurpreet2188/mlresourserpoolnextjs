import { renderToString } from 'react-dom/server'
import { Image as KonvaImage } from 'react-konva'
import { FaBeer } from 'react-icons/fa'
import { GrDocumentCsv, GrColumns, GrTable, GrTreeOption } from 'react-icons/gr'
import { LuRows, LuSettings2, LuHelpCircle } from 'react-icons/lu'
import { BiScatterChart } from 'react-icons/bi'
import { MdAutoGraph, MdOutlineForest } from 'react-icons/md'
import { NodesSettingsStatus } from '@/app/MLResourcePool'
import { NodeSettingContext } from '@/app/interface/types'
import { useContext } from 'react'

type imageIconTypes = {
  id: string
  iconName: string
  active: boolean
}
export const svgIcon = (IconComponent: React.ElementType) => {
  const svgString = renderToString(<IconComponent />)
  const image = new Image()
  image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`
  return image
}

function ImageIcon ({ id, iconName, active }: imageIconTypes) {
  const { nodeSettingsDispatch } =
    useContext<NodeSettingContext>(NodesSettingsStatus)
  
  const setImage = (IconComponent: React.ElementType) => {
    const icon = svgIcon(IconComponent)
    const settignsIcon = svgIcon(LuSettings2)
    const helpIcon = svgIcon(LuHelpCircle)

    const closeButtonHandle = () => {
      nodeSettingsDispatch({ type: id, value: true })
    }
    return (
      <>
        <KonvaImage
          image={icon}
          width={active ? 20 : 30}
          height={active ? 20 : 30}
          x={active ? 30 : 25}
          y={active ? 2 : 14}
        />
        <KonvaImage
          image={active ? settignsIcon : helpIcon}
          width={active ? 20 : 15}
          height={active ? 20 : 15}
          x={active ? 30 : 60}
          y={active ? 35 : 42}
          onClick={closeButtonHandle}
        />
      </>
    )
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
    case 'BiScatterChart':
      return setImage(BiScatterChart)
    case 'MdAutoGraph':
      return setImage(MdAutoGraph)
    case 'MdOutlineForest':
      return setImage(MdOutlineForest)
    case 'GrTreeOption':
      return setImage(GrTreeOption)
    default:
      return setImage(FaBeer)
  }
}

export default ImageIcon
