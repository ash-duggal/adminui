import React, { useEffect, useState } from "react";
import "./MembersTable.css";

const MemberRow = ({
  row,
  onRowCheck,
  onRowDelete,
  onRowEdit,
  onClickEdit,
  token,
}) => {
  const initialValues = { ...row };
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);

  useEffect(() => {
    setEditedValues(row);
  }, [row]);

  useEffect(() => {
    token === row.id ? setEditMode(true) : setEditMode(false);
  }, [token, row.id]);

  const handleCheck = () => onRowCheck(row.id);

  const handleDelete = () => onRowDelete(row.id);

  const handleEdit = (e) => {
    if (editMode) {
      const { name, value } = e.target;
      setEditedValues({
        ...editedValues,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setEditedValues(initialValues);
    setEditMode(false);
    onClickEdit(null);
  };

  const handleSave = () => {
    onRowEdit(editedValues);
    setEditMode(false);
    onClickEdit(null);
  };

  const handleEditMode = () => {
    onClickEdit(row.id);
  };

  return (
    <tr className={row.isChecked ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          onChange={handleCheck}
          checked={row.isChecked ? "checked" : ""}
        />
      </td>
      <td>
        <div className="inp-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editMode ? " editable" : " view"
            }`}
            name="name"
            value={editedValues.name}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div className="inp-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editMode ? " editable" : " view"
            }`}
            name="email"
            value={editedValues.email}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div className="inp-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editMode ? " editable" : " view"
            }`}
            name="role"
            value={editedValues.role}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div className="actions">
          {editMode ? (
            <>
              <span className="material-icons action-icon" onClick={handleSave}>
                <i className="fa fa-save"></i>
                save
              </span>
              <span
                className="material-icons action-icon"
                onClick={handleCancel}
              >
                <i className="fa fa-close"></i>
                close
              </span>
            </>
          ) : (
            <>
              <span
                className="material-icons action-icon"
                onClick={handleEditMode}
              >
                <i className="fa fa-edit"></i>
                edit
              </span>
              <span
                className="material-icons action-icon"
                onClick={handleDelete}
              >
                <i className="fa fa-trash"></i>
                delete
              </span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MemberRow;
