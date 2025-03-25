import {Html, Text} from '@react-email/components'

export function Mail({name}: {name: string}) {
	return <Html lang='ru'>
		<Text>{name}</Text>
	</Html>
}