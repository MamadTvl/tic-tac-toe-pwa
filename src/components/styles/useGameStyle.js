import {makeStyles} from "@material-ui/styles";

export const useGameStyle = makeStyles((theme) => ({
    game: {
        textAlign: 'center',
    },
    select: {
      display: 'flex',
        alignItems: 'center',
        marginBottom: 16
    },
    label: {
      marginRight: 8,
    },
    selectsContainer: {
        marginBottom: 16,
        display: "flex",
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
    }
}), {index: 1})
