import React from 'react'
import { Card, Badge, Container, Row, Col } from 'react-bootstrap'
import { useForecast, useIcon } from '../hooks'
import Skeleton from '@material-ui/lab/Skeleton'
import { Grid } from '@material-ui/core'
import moment from 'moment'

export default function LocationCard({ location }) {

    const forecast = useForecast(location);
    const name = location.LocalizedName;
    const icon = useIcon(forecast)

    if (!forecast) return <Skeleton />

    const { LocalObservationDateTime, WeatherText, IsDayTime,
        Temperature: { Metric: { Value, Unit } } } = forecast;

    // FIXME: get local time
    const time = moment.parseZone(LocalObservationDateTime).format('ddd, MMM Do, HH:mm')
    // const time = LocalObservationDateTime

    return (
        <Card>
            <Card.Body>

                <Card.Img variant="top" src={icon} style={{ maxWidth: '10em' }} />

                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle style={{ color: "#7c7c7c" }}>
                    {WeatherText}
                </Card.Subtitle>

                <Grid container spacing={2}>
                    <Grid item>
                        {time}
                    </Grid>
                    <Grid item>
                        <Badge variant={IsDayTime ? "light": "dark"}>
                            {IsDayTime ? "Day" : "Night"}
                        </Badge>
                    </Grid>
                </Grid>

                <Card.Text>
                    <strong>
                        {Value}{Unit}
                    </strong>
                </Card.Text>

            </Card.Body>
        </Card>
    )
}
