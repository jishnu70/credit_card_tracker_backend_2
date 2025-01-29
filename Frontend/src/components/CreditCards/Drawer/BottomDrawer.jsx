import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Input,
  FormControl,
  FormLabel,
  DrawerFooter,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import CreditCard from '../CreditCardComponent/CreditCard';
import styles from './Drawer.module.css';
import { useContext, useState } from 'react';
import { AccountContext } from '../../../MenuContext/AccountContext';
import api from '../../../Api/axios';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function BottomDrawer({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { ChangeCurrentCreditCard, setCurrentCreditCards, fetchCreditCards } = useContext(AccountContext);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const accountContent = [
    { label: "Card Holder Name", content: data.card_holder },
    { label: "Card Number", content: data.card_number },
    { label: "Expiry Date", content: data.expiry_date },
  ];

  const ChangeCreditCard = () => {
    ChangeCurrentCreditCard(data);
  };

  const addNewCard = async (formData) => {
    const formattedData = {
      ...formData,
      expiry_date: `${formData.expiry_date.getMonth() + 1}/${formData.expiry_date.getFullYear()}`
    };
    try {
      const response = await api.post('/api/add-card/', formattedData);
      console.log('Card added successfully:', response.data);
      fetchCreditCards();
      onAddClose();
    } catch (error) {
      console.error('Failed to add card:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Button 
        style={{ margin: "10px", marginTop: "50px" }}
        onClick={onOpen}
        colorScheme='twitter'
        variant='outline'>
        Use this one
      </Button>
      <Button 
        style={{ margin: "10px", marginTop: "50px" }}
        onClick={onAddOpen}
        colorScheme='twitter'
        variant='outline'>
        Add New Card
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
              {accountContent.map((item, index) => (
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
                  card_number: data.card_number,
                  card_holder: data.card_holder,
                  expiry_date: data.expiry_date,
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

      {/* Drawer for Adding New Card */}
      <Drawer placement={'bottom'} onClose={onAddClose} isOpen={isAddOpen}>
        <DrawerOverlay />
        <DrawerContent 
          height='75vh' 
          color='#fff'
          backgroundImage='linear-gradient(126deg, rgba(59,60,69,1) 0%, rgba(19,20,22,1) 100%)'>
          <DrawerHeader borderBottomWidth='1px'>Add New Card</DrawerHeader>
          <DrawerBody className={styles.body}>
            <form onSubmit={handleSubmit(addNewCard)}>
              <FormControl isInvalid={errors.card_holder}>
                <FormLabel>Card Holder Name</FormLabel>
                <Input
                  placeholder="Card Holder Name"
                  {...register("card_holder", { required: "Card Holder Name is required" })}
                />
                {errors.card_holder && <p className="error-message">{errors.card_holder.message}</p>}
              </FormControl>
              <FormControl mt={4} isInvalid={errors.card_number}>
                <FormLabel>Card Number</FormLabel>
                <Input
                  placeholder="Card Number"
                  {...register("card_number", {
                    required: "Card Number is required",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "Card Number must be 16 digits"
                    }
                  })}
                />
                {errors.card_number && <p className="error-message">{errors.card_number.message}</p>}
              </FormControl>
              <FormControl mt={4} isInvalid={errors.expiry_date}>
                <FormLabel>Expiry Date</FormLabel>
                <Controller
                  control={control}
                  name="expiry_date"
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="MM/YYYY"
                    />
                  )}
                  rules={{ required: "Expiry Date is required" }}
                />
                {errors.expiry_date && <p className="error-message">{errors.expiry_date.message}</p>}
              </FormControl>
              <DrawerFooter>
                <Button 
                  margin="10px" 
                  colorScheme='twitter' 
                  variant='outline'
                  type="submit">
                  Add Card
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
