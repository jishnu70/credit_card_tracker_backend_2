import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import CreditCard from '../CreditCardComponent/CreditCard'
import styles from './Drawer.module.css'
import { useContext } from 'react'
import { AccountContext } from '../../../MenuContext/AccountContext'

export default function BottomDrawer({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const acountContent = [
    { label: "Card Holder Name", content: data.cardHolderName },
    { label: "Card Number", content: data.cardNo },
    { label: "Expiry Date", content: data.cardExpDate },
  ];

  const { ChangeCurrentCreditCard } = useContext(AccountContext)
  const ChangeCreditCard = () => {
    ChangeCurrentCreditCard(data)
  }

  return (
    <>
      <Button 
        style={{ margin: "10px", marginTop: "50px" }}
        onClick={onOpen}
        colorScheme='twitter'
        variant='outline'>
        Use this one
      </Button>
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent 
          height='75vh' 
          color='#fff'
          backgroundImage='linear-gradient(126deg, rgba(59,60,69,1) 0%, rgba(19,20,22,1) 100%)'>
          <DrawerHeader borderBottomWidth='1px'>Account</DrawerHeader>
          <DrawerBody className={styles.body}>
            <div className={styles.content}>
              {acountContent.map((item, index) => (
                <span key={index} className={styles.data}>
                  <p style={{ opacity: ".6" }}>{item.label}</p>
                  <h5>{item.content}</h5>
                </span>
              ))}
            </div>
            <div className={styles.containerCard}>
              <CreditCard 
                locked={false}
                data={{
                  number: data.cardNo,
                  name: data.cardHolderName,
                  date: data.cardExpDate,
                }}
              />
              <div className={styles.containerButtons}>
                <Button 
                  margin="10px" 
                  colorScheme='twitter' 
                  variant='outline'
                  onClick={ChangeCreditCard}>
                  Change to this Card
                </Button>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
