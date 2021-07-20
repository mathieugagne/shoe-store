import React from "react";
import Layout from "components/Layout";
import RequestWrapper from "components/RequestWrapper";
import TableWrapper from "components/Table";
import useProductQuery from "common/hooks/useProductQuery";
import { useQueryClient } from "react-query";
import { useGlobalContext } from "common/hooks/useGlobalContext.js";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

const page = {
  title: "Welcome Page",
  description: "Welcome Page Description",
};

const Table = ({ data }) => {
  const queryClient = useQueryClient();

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "product_name",
      },
      {
        Header: "Store Name",
        accessor: "store_name",
      },
      {
        Header: "Units In Stock",
        accessor: "units_in_stock",
      },
    ],
    []
  );

  return <TableWrapper columns={columns} data={data} />;
};

export default function Home() {
  const { settings } = useGlobalContext();
  const { isFetching, data = [] } = useProductQuery();
  return (
    <RequestWrapper>
      <Layout metaHeader={{ ...page }} title={page.title}>
        <RequestWrapper isLoading={isFetching}>
          <>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.isSocketConnected}
                    disabled
                    color="primary"
                  />
                }
                label={`Live updates - ${settings.isSocketConnected ? "🟩 Connected": "🟥 Not Connected"}`}
              />
            </FormGroup>

            <Table data={data} />
          </>
        </RequestWrapper>
      </Layout>
    </RequestWrapper>
  );
}
