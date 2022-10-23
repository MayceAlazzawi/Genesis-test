import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Menu = ({ title, opt1, opt2, opt3 }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="btn-sm mb-1 p-1 bg-parent border-0">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#">
          {opt1}
        </Dropdown.Item>
        <Dropdown.Item href="#">
          {opt2}
        </Dropdown.Item>
        <Dropdown.Item href="#">
          {opt3}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Menu