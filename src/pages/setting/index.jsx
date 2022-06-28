import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import ProtectedRoute from '../navigation/ProtectedRoute';

const Setting = () => {
  return (
    <ProtectedRoute>
      <Sidebar>
        <div>Setting</div>
      </Sidebar>
    </ProtectedRoute>
  )
}

export default Setting;