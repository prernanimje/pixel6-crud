import React from 'react'
const List = ({Users,HandleEdit,HandleDelete}) => {
  
  return (
    <div>
      <h2>Users Data</h2>
      <ul>
        {Users.map((customer) => (
          <li key={customer.pan}>
            <p>PAN: {customer.pan}</p>
            <p>Full Name: {customer.fullName}</p>
            <p>Email: {customer.email}</p>
            <p>Mobile Number: +91 {customer.mobileNumber}</p>
            <div>
              {customer.addresses.map((address, index) => (
                <div key={index}>
                  <p>Address Line 1: {address.addressLine1}</p>
                  <p>Address Line 2: {address.addressLine2}</p>
                  <p>Postcode: {address.postcode}</p>
                  <p>City: {address.city}</p>
                  <p>State: {address.state}</p>
                </div>
              ))}
            </div>
            <button onClick={() => HandleEdit(customer)}>Edit</button>
            <button onClick={() => HandleDelete(customer.pan)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
