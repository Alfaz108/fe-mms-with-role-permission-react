//@ external lib import
import React, { useMemo, useState } from "react";

//@ MUI lib import

//@ component import
import CustomTable from "../../../../components/app/table";

//@ helper and util function
import DateFormatter from "../../../../utils/date-time/DateFormatter";
import { getURL } from "../../../../helpers/qs";

//@ rtk api services & features
import { useAdminMemberListQuery } from "../../../../redux/service/admin/adminMemberService";
import MemberCreateUpdate from "./MemberCreateUpdate";

//@ assign default value
const DEFAULT_MEMBER_VALUES = {
  name: "",
  mobile: "",
  roomNumber: "",
  status: "ACTIVE",
};

//@ main component
const AdminMember = () => {
  /**
   * react local state
   */
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MEMBER_VALUES);

  /**
   *   rtk mutation & Query
   */

  //@ member list
  const { memberList, isLoading, pagination, isError } =
    useAdminMemberListQuery(getURL(``), {
      selectFromResult: (data) => {
        console.log(data);
        return {
          pagination: data?.data?.pagination,
          memberList: data?.data?.data,
          isLoading: data?.isLoading,
          isError: data?.isError,
        };
      },
    });

  /**
   * Show the modal
   */
  const addShowModal = () => {
    setModal(true);
  };

  /**
   * table columns
   */
  const columns = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      {
        id: "mobile",
        label: "Mobile",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      {
        id: "roomNumber",
        label: "Room Number",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      {
        id: "role",
        label: "Role",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },

      {
        id: "createdAt",
        label: "Created Date",
        minWidth: 170,
        format: (value) => (value ? DateFormatter({ date: value }) : t("n/a")),
        align: "center",
      },
    ],
    []
  );

  /**
   * table columns
   */
  const renderTableData = useMemo(() => memberList || [], [memberList]);

  if (isLoading) {
    return <></>;
  } else if (isError) {
    return <></>;
  } else {
    return (
      <>
        <CustomTable
          columns={columns}
          data={renderTableData}
          addShowModal={addShowModal}
          tableInfo={{
            addTitle: "Member",
          }}
          paginationInfo={pagination}
        />

        <MemberCreateUpdate
          {...{
            modal,
            setModal,
            defaultValues,
            emptyDefaultValue: DEFAULT_MEMBER_VALUES,
          }}
        />
      </>
    );
  }
};

export default AdminMember;
