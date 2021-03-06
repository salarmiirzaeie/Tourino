import React from 'react';
import axios from 'axios';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';

import {
  Center,
  NativeBaseProvider,
  View,
  VStack,
  FormControl,
  Heading,
  Box,
  Input,
  Button,
  Link,
  IconButton,
  Menu,
  Divider,
  Text,
  Circle,
  Color,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {login} from '../../State-Management/actions/LoginAction';
import {createprofile} from '../../State-Management/actions/ProfileAction';

export const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const onSubmit = data => {
    axios
      .post('http://192.168.43.153:3333/api/account/login', data)
      .then(function (response) {
        if(response.data.name!=''){
          dispatch(login())
          dispatch(createprofile(response.data))
          // console.log("response.data.name");

        }
        // else{
        console.log(response.data)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <NativeBaseProvider>
      <View bg={'white'} flex={1} w={'100%'} alignItems={'center'}>
        <View w={'100%'} flex={0.1}>
          <Center>
           
            <Menu
              bg="white"
              mr={3}
              defaultIsOpen={false}
              w="190"
              trigger={triggerProps => {
                return (
                  <Box flexDirection={'row'}>
                    <Text>English</Text>
                    <IconButton
                      _icon={{
                        as: AntDesign,
                        name: 'down',
                        color: 'gray.400',
                        size: 3,
                        mt: -1,
                      }}
                      {...triggerProps}
                    />
                  </Box>
                );
              }}>
              <Menu.Group title="Free">
                <Menu.Item>Arial</Menu.Item>
                <Menu.Item>Nunito Sans</Menu.Item>
                <Menu.Item>Roboto</Menu.Item>
              </Menu.Group>
              <Divider mt="3" w="100%" />
              <Menu.Group title="Paid">
                <Menu.Item>SF Pro</Menu.Item>
                <Menu.Item>Helvetica</Menu.Item>
              </Menu.Group>
            </Menu>
          </Center>
        </View>
        <View w={'100%'} flex={0.8}>
          <Center flex={1}>
            <Text fontSize={50} bold={true}>
              Tourino
            </Text>
            <View w={'80%'}>
              <Formik
                initialValues={{
                  telno: '',
                  pass: '',
                  
                }}
                onSubmit={onSubmit}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <VStack width="100%" space={4}>
                    

                    <FormControl isRequired>
                      {/* <FormControl.Label>User Name</FormControl.Label> */}
                      <Input
                        bgColor={'gray.100'}
                        onBlur={handleBlur('telno')}
                        placeholder="UserName"
                        onChangeText={handleChange('telno')}
                        value={values.telno}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      {/* <FormControl.Label>Password</FormControl.Label> */}
                      <Input
                        bgColor={'gray.100'}
                        onBlur={handleBlur('pass')}
                        placeholder="Password"
                        onChangeText={handleChange('pass')}
                        value={values.pass}
                      />
                    </FormControl>

                    <Button onPress={handleSubmit} bg="#8F95D3">
                      Submit
                    </Button>
                    <Link>Forgot Password?</Link>
                    <Link onPress={() => navigation.navigate('SignUp')}>
                      SignUp
                    </Link>

                    <Divider />
                    <View
                      mt={2}
                      p={1}
                      flexDirection="row"
                      justifyContent="space-between">
                      <Circle size={50} shadow={7} bg="#00A693">
                        <AntDesign name="google" size={30} />
                      </Circle>

                      <Circle size={50} shadow={7} bg="#00A693">
                        <AntDesign name="github" size={30} />
                      </Circle>
                      <Circle size={50} shadow={7} bg="#00A693">
                        <Feather name="linkedin" size={30} />
                      </Circle>
                    </View>
                  </VStack>
                )}
              </Formik>
            </View>
          </Center>
        </View>
        <View w="100%" flex={0.1}>
          <View flex={0.5}></View>
          <Divider />

          <View flex={0.5} pl={10}>
            <Text>cd</Text>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};
