import React, { useRef, useState } from "react";

export default function Safari() {
  const tableStyle = {
    border: "2px solid black",
    fontSize: 20,
    width: "500px",
  };

  const innerTableStyle = {
    padding: "30px",
    display: "block",
  };
  const amountStyle = {
    width: "65px",
    height: "30px",
    textAlign: "left",
  };
  const labelRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };
  const subRowStyle = {
    gap: "4px",
    marginLeft: "22px",
  };

  const formKey = useRef();
  const [isChildChecked, setIsChildChecked] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [isSeniorChecked, setIsSeniorChecked] = useState(false);

  const childAmount = useRef();
  const adultAmount = useRef();
  const seniorAmount = useRef();
  const output = useRef();

  const onCalculate = (e) => {
  e.preventDefault();

  const ticketTypes = [
    { label: "เด็ก", price: 200, checked: isChildChecked, ref: childAmount },
    { label: "ผู้ใหญ่", price: 500, checked: isAdultChecked, ref: adultAmount },
    { label: "ผู้สูงอายุ", price: 300, checked: isSeniorChecked, ref: seniorAmount },
  ];

  let total = 0;
  const errors = [];

  for (const ticket of ticketTypes) {
    if (!ticket.checked) continue;

    const value = ticket.ref.current.value.trim();

    if (value === "" || isNaN(Number(value)) || Number(value) < 0) {
      errors.push(`กรุณากรอกจำนวนคนของ${ticket.label}`);
      continue;
    }

    total = total + Number(value) * ticket.price;
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  output.current.value = total;
};

  return (
    <form ref={formKey}>
      <div>
        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
          <table style={tableStyle}>
            <tbody>
              <tr style={tableStyle}>
                <th>ค่าเข้าซาฟารีเวิลด์</th>
              </tr>
              <tr>
                <td style={innerTableStyle}>
                  {/* Checkbox Input */}
                  <label style={labelRowStyle}>
                    <input
                      checked={isChildChecked}
                      onChange={(e) => {
                        setIsChildChecked(e.target.checked);
                      }}
                      type="checkbox"
                      name="child"
                    />
                    <span>เด็กส่วนสูงระหว่าง 100-150 ซม.</span>
                  </label>

                  {/* Amount Input */}
                  <div style={subRowStyle}>
                    <span>
                      ค่าเข้า 200 บาท จำนวน
                      <input
                        ref={childAmount}
                        type="text"
                        name="childAmount"
                        style={amountStyle}
                        disabled={!isChildChecked}
                      />
                      คน
                    </span>
                  </div>

                  {/* Checkbox Input */}
                  <label style={labelRowStyle}>
                    <input
                      checked={isAdultChecked}
                      onChange={(e) => setIsAdultChecked(e.target.checked)}
                      type="checkbox"
                      name="adult"
                    />
                    <span>ผู้ใหญ่</span>
                  </label>

                  {/* Amount Input */}
                  <div style={subRowStyle}>
                    <span>
                      ค่าเข้า 500 บาท จำนวน
                      <input
                        ref={adultAmount}
                        type="text"
                        name="adultAmount"
                        style={amountStyle}
                        disabled={!isAdultChecked}
                      />
                      คน
                    </span>
                  </div>

                  {/* Checkbox Input */}
                  <label style={labelRowStyle}>
                    <input
                      checked={isSeniorChecked}
                      onChange={(e) => setIsSeniorChecked(e.target.checked)}
                      type="checkbox"
                      name="senior"
                    />
                    <span>ผู้สูงอายุที่อายุเกิน 60 ปี</span>
                  </label>

                  {/* Amount Input */}
                  <div style={subRowStyle}>
                    <span>
                      ค่าเข้า 300 บาท จำนวน
                      <input
                        ref={seniorAmount}
                        type="text"
                        name="seniorAmount"
                        style={amountStyle}
                        disabled={!isSeniorChecked}
                      />
                      คน
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            type="button"
            onClick={(e) => onCalculate(e)}
            style={{ marginTop: "30px", marginLeft: "10px" }}
          >
            คิดเงิน
          </button>
          <div style={{ marginLeft: "10px", marginTop: "3px", fontSize: 18 }}>
            <label>
              รวมเป็นเงินทั้งสิ้น = <input type="text" ref={output} readOnly />{" "}
              บาท
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}