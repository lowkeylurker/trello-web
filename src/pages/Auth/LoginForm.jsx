import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/logo.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitLogIn = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Đang đăng nhập...' }
    ).then(res => {
      if (!res.error) navigate('/boards')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380 }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: (theme) => theme.palette.mainColor1[400] }}><LockIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'transparent' }}><TrelloIcon /></Avatar>
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.mainColor1[400] }}>
            Quản lí công việc: LeviMana
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
            {verifiedEmail &&
              <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Email &nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
                &nbsp;đã được xác thực.<br />Bây giờ bạn có thể đăng nhập để trải nghiệm dịch vụ của chúng tôi!
              </Alert>
            }
            {registeredEmail &&
              <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              Một email đã được gửi đến &nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
                <br />Vui lòng kiểm tra và xác thực trước khi đăng nhập!
              </Alert>
            }
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoComplete="nope"
                autoFocus
                fullWidth
                label="Nhập Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                sx={{ borderRadius: '10px' }}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Nhập Password..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password', {
                  required: PASSWORD_RULE_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em', my: 2 }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                borderRadius: '999px',
                bgcolor: (theme) => theme.palette.mainColor1[600],
                '&:hover': { bgcolor: (theme) => theme.palette.mainColor1[800] }
              }}
            >
              Đăng nhập
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Bạn là người mới?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: (theme) => theme.palette.mainColor1[600], '&:hover': { color: '#ffbb39' } }}>Tạo tài khoản!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
