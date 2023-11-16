import { useRef } from "react";

const typeMap = {
  cookies: "Cookies",
  mimeTypes: "Mime Types",
  headers: "Headers",
  postParams: "Post Body Params",
  queryArgs: "Query String Parameters",
};

export const SelectRedactions = ({ redactItems, setRedactedItems }) => {
  const ref = useRef(null);
  const handleGlobalCheckboxChange = (newVal) => {
    const newRedactedItems = { ...redactItems };
    Object.keys(newRedactedItems).forEach((type) => {
      Object.keys(newRedactedItems[type]).forEach(
        (item) => (newRedactedItems[type][item] = newVal),
      );
    });
    setRedactedItems(newRedactedItems);
  };
  const updateGlobalCheckboxState = () => {
    const allValues = Object.values(redactItems).flatMap((typeItems) =>
      Object.values(typeItems),
    );
    const allChecked = allValues.every(Boolean);
    const allUnchecked = allValues.every((val) => !val);
    const globalCheckbox = ref.current?.querySelector("#select-all-global");
    if (globalCheckbox) {
      globalCheckbox.checked = allChecked;
      globalCheckbox.indeterminate = !allChecked && !allUnchecked;
    }
  };
  const handleCheckboxChange = (type, item, newVal, selectAllInput) => {
    const newRedactedItems = { ...redactItems };
    const newTypeItems = { ...newRedactedItems[type] };
    newTypeItems[item] = newVal;
    newRedactedItems[type] = newTypeItems;
    const values = Object.values(newTypeItems);
    selectAllInput.indeterminate =
      !values.every((v) => v === true) && values.some((v) => v === true);
    setRedactedItems(newRedactedItems);
    updateGlobalCheckboxState();
  };
  const handleAllCheckboxChange = (type, newVal) => {
    const newRedactedItems = { ...redactItems };
    const newTypeItems = { ...newRedactedItems[type] };
    Object.keys(newTypeItems).map((item) => (newTypeItems[item] = newVal));
    newRedactedItems[type] = newTypeItems;
    setRedactedItems(newRedactedItems);
    updateGlobalCheckboxState();
  };
  return (
    <div ref={ref}>
      <ol style={{ listStyle: "none" }}>
        <li>
          Step 1 - Choose your redactions with any of the following methods
        </li>
        <ul>
          <li>Select individual items</li>
          <li>Select categories of items</li>
          <li>Scroll to the bottom and select "Redact Everything"</li>
        </ul>
        <br />
        <li>
          Step 2 - After selecting your redactions, click "Download Sanitized
          HAR"
        </li>
      </ol>
      {Object.entries(redactItems).map(([key, items], typeIndex) => {
        const itemKeys = Object.keys(items);
        if (itemKeys.length === 0) return null;
        const selectAllInputId = `select-all-${key}`;
        return (
          <>
            {typeIndex > 0}
            <fieldset style={{ padding: "1em 2em", margin: "1em" }}>
              <legend style={{ fontSize: "1.5em" }}>{typeMap[key]}</legend>
              <label>
                <input
                  style={{ fontSize: "1.25em" }}
                  type="checkbox"
                  name={`all-${key}`}
                  id={selectAllInputId}
                  checked={itemKeys.every((k) => items[k])}
                  onChange={(e) => {
                    handleAllCheckboxChange(key, e.target.checked);
                  }}
                />
                <span style={{ fontSize: "1.25em" }}>
                  Redact All {typeMap[key]}
                </span>
              </label>
              <br />
              <br />
              <div style={{ columnCount: "2" }} key={key}>
                {Object.entries(items).map(([item, val]) => {
                  return (
                    <div key={item}>
                      <label style={{ textIndent: "1rem", fontSize: "1em" }}>
                        <input
                          type="checkbox"
                          name={item}
                          checked={val}
                          onChange={() => {
                            const selectAllInput = ref.current?.querySelector(
                              `#${selectAllInputId}`,
                            );
                            if (selectAllInput) {
                              handleCheckboxChange(
                                key,
                                item,
                                !val,
                                selectAllInput,
                              );
                            }
                          }}
                        />
                        <code>{item}</code>
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </>
        );
      })}
      <fieldset style={{ padding: "1em 2em", margin: "1em" }}>
        <legend style={{ fontSize: "1.5em" }}>Select All</legend>
        <label>
          <input
            style={{ fontSize: "1.25em" }}
            type="checkbox"
            id="select-all-global"
            onChange={(e) => handleGlobalCheckboxChange(e.target.checked)}
          />
          <span style={{ fontSize: "1.25em" }}>Redact Everything</span>
        </label>
      </fieldset>
    </div>
  );
};
