import React, { useEffect, useState } from "react"

import useGAPI from "./gapi/useGAPI"

function App() {
    const { signedIn, gapi } = useGAPI()
    const [files, setFiles] = useState(undefined)

    useEffect(() => {
        if (gapi !== undefined && signedIn) {
            gapi.client.drive.files
                .list({
                    pageSize: 10,
                    fields: "nextPageToken, files(id, name)"
                })
                .then((response) => {
                    setFiles(response.result.files)
                })
        }
    }, [gapi, signedIn])

    if (!gapi) {
        return <h4>Loading...</h4>
    } else if (!signedIn) {
        return <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>Authorize</button>
    } else {
        return (
            <React.Fragment>
                <button
                    onClick={() => {
                        gapi.auth2.getAuthInstance().disconnect()
                        gapi.auth2.getAuthInstance().signOut()
                    }}
                >
                    Sign out
                </button>
                <p>
                    {files !== undefined &&
                        files.map((file, index) => (
                            <div key={index}>
                                <p>
                                    {file.name}:{file.id}
                                </p>
                            </div>
                        ))}
                </p>
            </React.Fragment>
        )
    }
}

export default App
