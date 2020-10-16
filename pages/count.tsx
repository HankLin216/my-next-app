import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { ReactElement } from "react";

import { MaterialTableIcon } from "../components/MaterialTableIcon";
const count = (): ReactElement => {
    const [messgae, setMessgae] = useState();
    useEffect(() => {
        const callApi = async () => {
            const data = await fetch("/api/hello").then((res) => res.json());
            setMessgae(data.name);
        };
        callApi();
    }, []);
    return (
        <>
            <h1> {`get messgae from api :${messgae}`} </h1>
            <MaterialTable
                icons={MaterialTableIcon}
                columns={[
                    { title: "Adı", field: "name" },
                    { title: "Soyadı", field: "surname" },
                    { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                    {
                        title: "Doğum Yeri",
                        field: "birthCity",
                        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                    }
                ]}
                data={[{ name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }]}
                title="Demo Title"
            />
        </>
    );
};

export default count;
