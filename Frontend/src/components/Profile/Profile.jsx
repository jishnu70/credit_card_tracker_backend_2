import React from 'react'
import ProfileCSS from'./Profile_styles.module.css'
import ChartTabs from './ChartsComponents/ChartTabs'
import images from '../../assets/exports/ContacList'
import { RiNotification2Fill } from 'react-icons/all'
import { BiMessageSquareDots } from 'react-icons/all'
import { CgMenuRightAlt } from 'react-icons/all'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Tooltip
} from '@chakra-ui/react'

function Profile() {

  const notifications = []

  return (
    <div className={ProfileCSS.father}>
        
        <div className={ProfileCSS.statics_container}>
            <div className={ProfileCSS.balance_title}>
              <h5 style={{padding: "10px"}}>Expenses</h5>
              <CgMenuRightAlt style={{padding: "10px", cursor: "pointer"}}/>
            </div>
            <div className="profile-statics-graph">
              <div className={ProfileCSS.background}>
                <div className={ProfileCSS.wheel}>
                  <div className={ProfileCSS.total}>
                    <span className={ProfileCSS.average}>
                    Average Spending
                    <label className={ProfileCSS.money}>
                      $3,428
                    </label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <ChartTabs />
    </div>
  )
}

export default Profile