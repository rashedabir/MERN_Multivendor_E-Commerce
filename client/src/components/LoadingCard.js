import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

function LoadingCard({ loading }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton height={200} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton height={20} />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Skeleton height={10} count={4} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default LoadingCard;
