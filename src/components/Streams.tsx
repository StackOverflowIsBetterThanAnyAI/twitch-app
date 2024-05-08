import { getStreams } from '../helper/getStreams'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'

const Streams = () => {
    getStreams(CLIENT_ID, CLIENT_SECRET)
    return <div>Hello again!</div>
}

export default Streams
