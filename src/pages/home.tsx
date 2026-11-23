import {useEffect, useState} from "react";
import {Alert, Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CapsuleCard from '../components/CapsuleCard/CapsuleCard';
import {listCapsules} from "../services/capsuleStorage.ts";
import type {Capsule} from "../types/capsule.ts";


type Preview =
    | { status: 'ready'; capsules: Capsule[] }
    | { status: 'error' }

export default function Home() {
    const [preview] = useState<Preview>(() => {
        try {
            return { status: 'ready', capsules: listCapsules() }
        } catch {
            return { status: 'error' }
        }
    })
    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
        return () => window.clearInterval(intervalId)
        }, [])

    const nextCapsule = preview.status === 'ready'
        ? preview.capsules.reduce<Capsule | undefined>((next, capsule) => {
            const opensAt = Date.parse(capsule.opensAt)

            if (!Number.isFinite(opensAt) || opensAt <= now) {
                return next
            }

            if (!next || opensAt < Date.parse(next.opensAt)) {
                return capsule
            }

            return next
        }, undefined)
        : undefined

    return (
        <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Typography component="h1" variant="h4">Dear Future</Typography>
            <Typography>Escreva uma carta para o seu futuro.</Typography>
            <Button component={Link} to="/capsules/new" variant="contained">
                Nova cápsula
            </Button>

            <Stack component="section" spacing={1} sx={{ width: '100%' }}>
                <Typography component="h2" variant="h6">Próxima cápsula</Typography>

                {preview.status === 'error' && (
                    <Alert severity="error">Não foi possível carregar suas cápsulas</Alert>
                )}

                {preview.status === 'ready' && (
                    nextCapsule
                    ? <CapsuleCard capsule={nextCapsule} />
                    : <Typography>Nenhuma cápsula com abertura futura.</Typography>
                )}
            </Stack>
        </Stack>
    )
}
