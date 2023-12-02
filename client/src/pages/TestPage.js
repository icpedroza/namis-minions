import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import config from "../config.json";

export default function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/test`)
            .then(r => r.json())
            .then(r => setData(r));
    }, []);

    return (
        <Container>
            <p>{data.content}</p>
        </Container>
    )
}