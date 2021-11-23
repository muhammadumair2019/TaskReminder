import React , { useState,useEffect }from 'react';
import { Text, StyleSheet,View,Image,TextInput,Modal,FlatList,TouchableOpacity,TouchableWithoutFeedback,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const DATA = [
  {
    title: 'Meeting at 9 pm',
    description: 'Comsats University Lahore',
    category: 'Work',
    time: '8.30 AM'
    
  },
  {
    title: 'Meeting at 9 pm',
    description: 'Comsats University Lahore',
    category: 'Work',
    time: '8.30 AM'
    
  },
]

const Categories = [
  {label: 'Work' , value: 1},
  {label: 'Sleep' , value: 2},
  {label: 'Drink' , value: 3},
  {label: 'Meeting' , value: 4},
  {label: 'Gym' , value: 5},
  {label: 'Other' , value: 6}
]

function ActiveScreen(){
    return(
      <Text>yup</Text>
    );
}

function AddScreen(){

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(task_id INTEGER PRIMARY KEY AUTOINCREMENT, Title VARCHAR(30), Category VARCHAR(10), Description VARCHAR(30), Date VARCHAR(15), Time VARCHAR(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  const [modalVisible,setModalVisible]= useState(false);
  const [selectCategory,setSelectCategory]= useState('Choose Category');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate()+ '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    let ftime = tempDate.getHours() + ':' + tempDate.getMinutes();
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return(
        <View>
            <Formik
                    initialValues={{title: '',description: ''}}
                    onSubmit={(values) => {console.log(values)} } 

                    >
                    {({handleChange,handleSubmit}) => (
                        <>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Title"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={handleChange('title')}
                    
                    
                    />
            </View>

            <View>
           <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
               <Text style={styles.TextField} >{selectCategory}</Text>
           </TouchableWithoutFeedback>
           <Modal visible={modalVisible} animationType="slide">
               <Button title='close'  onPress={() => setModalVisible(false)}></Button>
               <FlatList
               data={Categories}
               keyExtractor={item => item.value.toString()}
               numColumns={3}
               style={{backgroundColor:'#2abcc8',paddingHorizontal:50,}}
               renderItem={({item})=> 
               <TouchableOpacity style={{marginTop:20,marginRight:10,paddingHorizontal:12,borderRadius:50,borderWidth:1,borderColor:'white'}} onPress={() => {setSelectCategory(item.label) 
               setModalVisible(false)}}>
               <Text style= {{padding:10,fontWeight:'bold',fontFamily:'roboto'}}> {item.label}</Text> 
               </TouchableOpacity>
            }
               />
           </Modal>
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Description"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={handleChange('description')}
                    
                    
                    />
            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <TouchableOpacity style={{
              borderRadius:50,
              borderWidth:1,
              borderColor:'grey',
              height: 40,
              fontFamily:'roboto',
              padding: 10,
              width: 370,
              
              
            }} onPress={showDatepicker}><Text style={{fontFamily:'roboto'}}>Select Date</Text></TouchableOpacity>
              {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <TouchableOpacity style={{
              borderRadius:50,
              borderWidth:1,
              borderColor:'grey',
              height: 40,
              fontFamily:'roboto',
              padding: 10,
              width: 370,
              
              
            }} onPress={showTimepicker}><Text style={{fontFamily:'roboto'}}>Select Time</Text></TouchableOpacity>
              {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <TouchableOpacity
                style={{
                    width:300,
                    height:40,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'
                }} onPress={handleSubmit}
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>ADD</Text></TouchableOpacity>
            </View>
                       
            </>
                    )
                    }
                    </Formik>      

        </View>
    
  );
}

function MyTaskScreen(){
  return(
    <View>
    <FlatList
              
          data={DATA}
          
          keyExtractor={(item, index) => index}
          
          renderItem={({item})=> 

          
          <View style={{backgroundColor:'white', padding:10,borderBottomWidth:5,borderBottomColor:'white'}}>


          <View style={{flex:1,backgroundColor:'white',flexDirection:'row'}}>

            <View style={{flex:1, backgroundColor:'white'}}>
             <Image source={require('./android/app/src/main/assets/reminder.png')}
            style={{height:39,width:39,tintColor:'red'}}
            /> 
           </View>
            
           <View style={{flex:6, backgroundColor:'white'}}> 
            

            <Text style={{marginLeft:10,fontSize:15, color:'black',fontFamily:'times'}}> {item.title} </Text>
            <Text style={{marginLeft:10,fontSize:14,marginTop:2, color:'#2f4f4f',fontFamily:'times'}}> {item.description}</Text> 
            <Text style={{marginLeft:10,fontSize:12,marginTop:2, color:'#2f4f4f',fontFamily:'times'}}> <Text>Category: </Text> {item.category}</Text> 

           </View>

           <View style={{flex:3, backgroundColor:'white', alignItems:'flex-end'}}>
            
            <Text style={{fontSize:18,color:'#0BCB54'}}> {item.time} </Text>
            
           </View>

          </View>

                      
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
          <TouchableOpacity
                style={{
                    width:150,
                    height:30,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'
                }} 
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>Update</Text></TouchableOpacity>
                <TouchableOpacity
                style={{
                  width:150,
                  height:30,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'
                }} 
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>Delete</Text></TouchableOpacity>
          </View>
        
      
            
      </View>

      
          


               }
          />
          </View>

  );
}

const ActiveStack = createNativeStackNavigator();

function ActiveStackScreen() {
  return (
    <ActiveStack.Navigator>
      <ActiveStack.Screen name="Active" component={ActiveScreen} options={{ headerShown: false }} />
      
      
    </ActiveStack.Navigator>
  );
}

const AddStack = createNativeStackNavigator();
function AddStackScreen(){
  return (
    <AddStack.Navigator>
    <AddStack.Screen name="Add" component={AddScreen} options={{ headerShown: false }} />
    
  </AddStack.Navigator>

  );

}



const MyTaskStack = createNativeStackNavigator();
function MyTaskStackScreen(){
  return (
    <MyTaskStack.Navigator>
    <MyTaskStack.Screen name="MyTask" component={MyTaskScreen} options={{ headerShown: false }} />
    
  </MyTaskStack.Navigator>

  );

}

const Tab = createBottomTabNavigator();
const TabBar = () => {
  return (
    
      <Tab.Navigator 
      screenOptions = {{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
             position: 'absolute',
             left: 20,
             right: 20,
             bottom: 25,
             elevation: 0,
             borderRadius: 15,
             height: 70,
            ...styles.shadow 

          }

      }}
      
      >
        <Tab.Screen name="ActiveTab" component={ActiveStackScreen}  options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source = {require('./android/app/src/main/assets/active.png')} 
              resizeMode='contain'
               style={{
                 width:25,
                 height:25,
                 tintColor: focused ? '#e32f45' : '#748c94'
                 
               }}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Active</Text>
            </View>
          ),
         }}/>
        <Tab.Screen name="AddTab" component={AddStackScreen}  options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source = {require('./android/app/src/main/assets/plus.png')} 
              resizeMode='contain'
               style={{
                 width:25,
                 height:25,
                 tintColor: focused ? '#e32f45' : '#748c94'
                 
               }}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Add</Text>
            </View>
          ),
         }}/>
        <Tab.Screen name="MyTaskTab" component={MyTaskStackScreen}  options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source = {require('./android/app/src/main/assets/mytask.png')} 
              resizeMode='contain'
               style={{
                 width:25,
                 height:25,
                 tintColor: focused ? '#e32f45' : '#748c94'
                 
               }}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>MyTasks</Text>
            </View>
          ),
         }}/>
        
      </Tab.Navigator>
    
  );

}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Details" component={TabBar} options={{headerShown:false}} />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
       shadowOffset: {
         width: 0,
         height: 10,
       },
    shadowOpacity: '0.25',
    shadowRadius: '3.5',
    elevation: 5,
  },
  TextField: {
    borderRadius:50,
    borderWidth:1,
    borderColor:'grey',
    height: 40,
    fontFamily:'roboto',
    padding: 10,
    width: 370,
    marginTop:10,
    marginLeft:20
}
})

export default App;