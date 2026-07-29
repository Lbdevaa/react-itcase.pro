import {Link} from 'react-router-dom'

import {ROUTES} from 'shared/config'
import {Button} from 'shared/ui/button'
import {StateMessage} from 'shared/ui/stateMessage'

export function NotFoundPage() {
  return (
    <StateMessage
      title="Страница не найдена"
      description="Проверьте адрес или вернитесь в каталог."
      action={
        <Link to={ROUTES.products}>
          <Button variant="secondary">Перейти в каталог</Button>
        </Link>
      }
    />
  )
}
