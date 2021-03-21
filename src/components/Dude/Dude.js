import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Dude({ dude }) {
    const classes = useStyles();
    const history = useHistory()
    const handleBook = (ticketType) => {
        history.push(`/book/${ticketType}`);
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                title={dude.title}
            />

            <CardMedia
                className={classes.media}
                image={dude.imgUrl}
                title="Paella dish"
            />
            <img src={`/images/${dude.ticketType}.png`} alt="" />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {dude.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button onClick={() => handleBook(dude.ticketType)} variant="contained" color="primary">
                    Book
        </Button>
            </CardActions>
        </Card>
    );
}