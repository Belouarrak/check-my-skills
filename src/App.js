import { useState } from "react";
import {
  Button,
  Card,
  Container,
  List,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Item from "./Item";
import CustomAppBar from "./CustomAppBar";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#F5FAFA",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    marginRight: 15,
    marginBottom: 15,
  },
  numberInput: {
    width: 80,
    marginRight: 15,
    marginBottom: 15,
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  card: {
    padding: 15,
    margin: 15,
  },
});

function App() {
  const classes = useStyles();

  const [shoppingList, setShoppingList] = useState([
    { title: "bananas", quantity: 2 },
    { title: "cherries", quantity: 5 },
  ]);

  const [currentItem, setCurrentItem] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1); // currentIndex pour récuperer l'index de l'array entre les const

  const addItem = (e) => {
    e.preventDefault();

    if (currentItem !== "" && currentNumber > 0) {
      // Vérifie si l'index est différent du défaut et vérifie si le titre est le même entre celui de l'index et du formulaire pour l'update
      if (
        currentIndex !== -1 &&
        shoppingList[currentIndex].title === currentItem
      ) { 
        let newShopList = [...shoppingList];
        newShopList[currentIndex] = {
          title: currentItem,
          quantity: currentNumber,
        };
        setShoppingList(newShopList);

        setCurrentItem("");
        setCurrentNumber(0);
        setCurrentIndex(-1);
      } else {
        // Sinon on ajoute directement un nouvel objet
        setShoppingList([
          ...shoppingList,
          {
            title: currentItem,
            quantity: currentNumber,
          },
        ]);

        setCurrentItem("");
        setCurrentNumber(0);
        setCurrentIndex(-1);
      }
    } else {
      alert("Il faut écrire un item et aussi mettre une quantité supérieure à 0"); // Alerte si l'input utilisateur ne correspond pas
    }
  };

  // un filter pour enlever l'objet cliqué
  const removeItem = (index) => {
    const newShoppingList = shoppingList.filter((item, key) => index !== key); 
    setShoppingList([...newShoppingList]);
  };

  const onTextChanged = (e) => {
    setCurrentItem(e.target.value);
  };

  const onNumberChanged = (e) => {
    setCurrentNumber(e.target.value);
  };

  // On se sert de l'index récupéré pour directement insérer l'index et l'item
  const onTextClicked = (e, index) => {
    setCurrentIndex(index);
    setCurrentItem(e.title);
    setCurrentNumber(e.quantity);
  };

  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Card className={classes.card}>
            <form onSubmit={addItem}>
              <div className={classes.form}>
                <div>
                  <TextField
                    className={classes.textInput}
                    label="Item"
                    value={currentItem}
                    onChange={onTextChanged}
                  />
                </div>
                <div>
                  <TextField
                    type="number"
                    className={classes.numberInput}
                    label="Quantity"
                    value={currentNumber}
                    onChange={onNumberChanged}
                  />
                </div>
                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Card>
          <Card className={classes.card}>
            <List>
              {shoppingList.map((item, key) => {
                return (
                  <Item
                    item={item}
                    key={key}
                    index={key}
                    removeCallback={removeItem}
                    clickedItem={onTextClicked}
                  />
                );
              })}
            </List>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default App;
