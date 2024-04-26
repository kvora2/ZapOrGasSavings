import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Pressable, TextInput} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';

//imports for getting icons
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';

export default function App() {
  // Gas based Details
  const [pricePerLit, setPricePerLit] = useState("1.80")
  const [gasMileage, setGasMileage] = useState("10.2")

  // EV based Detail
  const [evCost, setEvCost] = useState("0.1235")
  const [evMileage, setEvMileage] = useState("4.94")
  const [evTravel, setEvTravel] = useState("")
  const [evAddDist, setEvAddDist] = useState("")
  const [annualSavings, setAnnualSavings] = useState("")

  // Vehicle km driven
  const [yearlyKm, setYearlyKm] = useState("15000");
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);

  // getting Estimate Savings when Button pressed
  const btnPressed = () => {
    // Calculating and setting Ev details
    let evDistance = (evMileage + (pricePerLit/evCost))
    console.log(evDistance)
    let addDistace = evDistance - gasMileage
    
    setEvTravel(parseInt(evDistance).toFixed(1))
    setEvAddDist(parseInt(addDistace).toFixed(1))

    // Calculating and setting Annual Savings
    console.log(`Yearly KM driven -> ${yearlyKm}`)
    let annualGasCost = (pricePerLit * (yearlyKm/gasMileage))

    let annualEvCost = (evCost * (yearlyKm/evMileage))

    let savings = annualGasCost - annualEvCost

    setAnnualSavings(savings.toFixed(0));
  }

  return (
    <SafeAreaView>
      <View style={[styles.container, {padding:20, flexDirection:"column"}]}>
 
          {/* header and Field section */}
          <View style={{paddingTop:20}}>
             <Text style={styles.headingText}>EV Savings Calculator</Text>
             <Text style={styles.text}>Gas Vehicle Information</Text>
             <View style={styles.fieldView}>
                <TextInput style={styles.inField}
                    placeholder="Price Per Litre ($/L)"
                    value={pricePerLit}
                    onChangeText={setPricePerLit}/>

                <TextInput style={styles.inField}
                    placeholder="Gas mileage (km/L)"
                    value={gasMileage}
                    onChangeText={setGasMileage}
                    />
             </View>

             <Text style={styles.text}>Electric Vehicle</Text>
             <View style={styles.fieldView}>
                <TextInput style={styles.inField}
                    placeholder="Utilities Cost ($/kwH)"
                    value={evCost}
                    onChangeText={setEvCost}/>

                <TextInput style={styles.inField}
                    placeholder="EV mileage (km/kwH)"
                    value={evMileage}
                    onChangeText={setEvMileage}
                    />
             </View>

             <Text style={styles.text}>How many km do you drive each year?</Text>
             <SegmentedControl
                values={["15000", "25000", "40000"]}
                selectedIndex={selectedSegmentIndex}
                onChange={(event) => {
                  setSelectedSegmentIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                onValueChange={setYearlyKm}
                style={{marginTop: 10}}
              />
          </View>
 
 
          {/* Saving button */}
          <View style={{justifyContent: "center", paddingVertical: 20}}>
            <Pressable style={{borderWidth:1, borderColor:"black", borderRadius:10}} onPress={btnPressed}>
              <Text style={{textAlign:"center", color:"black", fontSize:18, fontWeight:"bold", paddingVertical: 10}}>Estimate Savings</Text>
            </Pressable>
          </View>
 
 
          {/* footer and Info Section */}
          <Text style={{fontSize: 17, textAlign: "center", paddingVertical: 5}}>For the price of 1 litre of gas, you can travel:</Text>
          <View style={{flexDirection: "row", alignItems:"flex-start", justifyContent:"space-evenly"}}>
            <View style={[styles.badge, {backgroundColor: "#FFA07A"}]}>
                <FontAwesome6 name="gas-pump" size={20} color="black" style={{textAlign: "center"}} />
                <Text style={{fontSize:20, fontWeight: "bold", textAlign: "center"}}>{gasMileage ? gasMileage : "NaN"}</Text>
                <Text style={{fontSize:12, fontWeight: "bold", textAlign: "center"}}>km</Text>
            </View>
            <View style={[styles.badge, {backgroundColor: "#98FB98"}]}>
                <FontAwesome6 name="charging-station" size={20} color="black" style={{textAlign: "center"}} />
                <Text style={{fontSize:20, fontWeight: "bold", textAlign: "center"}}>{evTravel ? evTravel : "NaN"}</Text>
                <Text style={{fontSize:12, fontWeight: "bold", textAlign: "center"}}>km</Text>
            </View>
            <View style={[styles.badge, {backgroundColor: "gold"}]}>
                <FontAwesome name="plus-circle" size={20} color="black" style={{textAlign: "center"}} />
                <Text style={{fontSize:20, fontWeight: "bold", textAlign: "center"}}>{evAddDist ? evAddDist : "NaN"}</Text>
                <Text style={{fontSize:12, fontWeight: "bold", textAlign: "center"}}>km more</Text>
            </View>
          </View>


          <View style={{textAlign: "center"}}>
            <Text style={{fontSize: 17, textAlign: "center", paddingVertical: 14}}> By switching to Electric, you obtain: </Text>
            <Text style={styles.infoTag}>
              <Text style={{fontSize: 30}}>${annualSavings ? annualSavings : "NaN"}</Text>{'\n'}
              <Text style={{fontWeight: "normal"}}>is savings per year</Text>
            </Text>
          </View>


      </View> 
    </SafeAreaView>
  );
 }

const styles = StyleSheet.create({
container: {
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor:"#fff",  
  paddingHorizontal:10,
},

headingText: {
  fontSize:30,
  textAlign:"left",
  fontWeight:'bold',
  paddingBottom: 10
},

text: {
  fontSize:15
},

fieldView: {
  flexDirection: "row", 
  justifyContent: "space-between", 
  paddingBottom: 10
},

inField: {
  width:"48%",   
  padding:10,
  fontSize:13,
  marginTop: 5,
  backgroundColor: "#f0f0f0",
  borderRadius: 10
},

badge: {
  marginVertical: 5,
  paddingHorizontal: 30,
  padding: 10,
  borderRadius: 140,
},

infoTag: {
  textAlign:"center", 
  color:"white", 
  fontSize:18,
  fontWeight:"bold", 
  paddingVertical: 15,
  backgroundColor: "black",
  borderRadius: 10
}
});
