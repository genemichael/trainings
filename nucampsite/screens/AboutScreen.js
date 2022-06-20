import { useState } from "react"
import { Avatar, Card, ListItem, Text } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import { PARTNERS } from "../shared/partners"

const Mission = () => {
    <Card>
        <Card.Title>
            Our Mission
        </Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
        </Text>
    </Card>
}

const AboutScreen = () => {
    const [partners, setPartners] = useState(PARTNERS);
    return (
        <ScrollView>
            <Mission />
            <Card>
                <Card.Title>
                    Community Partners
                </Card.Title>
                <Card.Divider />
                {
                    PARTNERS.map((item, index) => {
                        return (
                            <ListItem.Content key={`list-item${index}`}>{/**
                 * list-item1
                 * list-item2
                 * list-item3
                 */}
                                <Avatar rounded source={partners.image}>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    <ListItem.Subtitle>{ListItem.description}</ListItem.Subtitle>
                                </Avatar>
                            </ListItem.Content>
                        )
                    }
                    )
                };
            </Card>
        </ScrollView>
    )
}

export default AboutScreen