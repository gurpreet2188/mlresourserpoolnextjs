import {useContext} from "react";
import {NodesSettingsStatus} from "@/app/MLResourcePool";
import SettingsPanel from "@/app/components/nodesData/SettingsPanel";

export default function HelpMessage({id}) {
    const {nodeSettingsState} = useContext(NodesSettingsStatus)
    console.log(nodeSettingsState[id])
        const Component =()=>{
            return(
                <div>
                    <p>{nodeSettingsState[id]['message']}</p>
                </div>
            )
        }

    return (
        <SettingsPanel id={id} title={"Message"} showSaveBtn={false} closebtntype={'helpMessage'}><Component/></SettingsPanel>
    )
}