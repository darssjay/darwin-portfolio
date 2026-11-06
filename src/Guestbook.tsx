import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './Guestbook.css'

type Message = {
  id: number
  name: string
  message: string
  status: 'pending' | 'approved'
  created_at: string
}

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook_messages')
      .select('id, name, message, status, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      setNotice('Unable to load messages. Please try again.')
      return
    }

    setMessages((data ?? []) as Message[])
  }

  const verifyAdmin = async () => {
    const { data, error } = await supabase.rpc('is_guestbook_admin')
    setIsAdmin(!error && data === true)
  }

  useEffect(() => {
    let active = true

    const initialize = async () => {
      const { data } = await supabase.auth.getSession()
      if (!active) return
      if (data.session) {
        await verifyAdmin()
      }

      if (active) await loadMessages()
    }

    void initialize()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!nextSession) {
          setIsAdmin(false)
          void loadMessages()
        } else {
          void verifyAdmin().then(() => loadMessages())
        }
      }
    )

    return () => {
      active = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setNotice('')

    const { error } = await supabase.from('guestbook_messages').insert({
      name: name.trim(),
      message: message.trim(),
      status: 'pending'
    })

    if (error) {
      setNotice('Message could not be submitted. Please try again.')
    } else {
      setName('')
      setMessage('')
      setNotice('Message submitted! It will appear after admin approval.')
      if (isAdmin) await loadMessages()
    }

    setBusy(false)
  }

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setNotice('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    })

    if (error) {
      setNotice('Login failed. Check your email and password.')
    } else {
      setPassword('')
      setShowLogin(false)
      setNotice('Login successful.')
    }

    setBusy(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setNotice('Admin logged out.')
  }

  const approveMessage = async (id: number) => {
    const { error } = await supabase
      .from('guestbook_messages')
      .update({ status: 'approved' })
      .eq('id', id)

    setNotice(error ? 'Unable to approve message.' : 'Message approved.')
    if (!error) await loadMessages()
  }

  const deleteMessage = async (id: number) => {
    const { error } = await supabase
      .from('guestbook_messages')
      .delete()
      .eq('id', id)

    setNotice(error ? 'Unable to delete message.' : 'Message deleted.')
    if (!error) await loadMessages()
  }

  const publicMessages = messages.filter(item => item.status === 'approved')
  const pendingMessages = messages.filter(item => item.status === 'pending')

  return (
    <section id="guestbook" className="section-container section-block">
      <div className="section-heading">
        <span className="section-number">08 / COMMUNITY WALL</span>
        <h2>VISITOR <span>GUESTBOOK</span></h2>
        <p>LEAVE A MESSAGE IN MY DIGITAL WORLD</p>
      </div>

      <div className="guestbook-layout">
        <form className="guestbook-form panel" onSubmit={submitMessage}>
          <span className="panel-tag">✦ LEAVE YOUR MARK</span>
          <label htmlFor="guest-name">YOUR NAME</label>
          <input
            id="guest-name"
            value={name}
            onChange={event => setName(event.target.value)}
            maxLength={40}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="guest-message">YOUR MESSAGE</label>
          <textarea
            id="guest-message"
            value={message}
            onChange={event => setMessage(event.target.value)}
            maxLength={500}
            rows={4}
            placeholder="Write something nice..."
            required
          />

          <button type="submit" disabled={busy}>
            {busy ? 'SUBMITTING...' : 'SUBMIT MESSAGE ↗'}
          </button>

          <p className="guestbook-hint">
            Messages are reviewed before appearing publicly.
          </p>
        </form>

        <div className="guestbook-wall panel">
          <div className="guestbook-wall-heading">
            <span className="panel-tag">✦ COMMUNITY MESSAGES</span>
            <span className="guestbook-count">{publicMessages.length} APPROVED</span>
          </div>

          {publicMessages.length === 0 ? (
            <p className="guestbook-empty">
              No messages yet. Be the first to leave one!
            </p>
          ) : (
            <div className="guestbook-messages">
              {publicMessages.map(item => (
                <article className="guestbook-message" key={item.id}>
                  <div className="guestbook-message-top">
                    <strong>{item.name}</strong>
                    <time>{new Date(item.created_at).toLocaleDateString()}</time>
                  </div>
                  <p>{item.message}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {notice && <p className="guestbook-notice" role="status">{notice}</p>}

      <div className="guestbook-admin-access">
        {isAdmin ? (
          <div className="guestbook-admin panel">
            <div className="guestbook-admin-heading">
              <div>
                <span className="panel-tag">ADMIN CONTROL CENTER</span>
                <h3>MESSAGE MODERATION</h3>
                <p>{pendingMessages.length} messages waiting for approval</p>
              </div>
              <button type="button" className="guestbook-logout" onClick={logout}>
                LOG OUT
              </button>
            </div>

            {pendingMessages.length === 0 ? (
              <p className="guestbook-empty">No pending messages.</p>
            ) : pendingMessages.map(item => (
              <article className="guestbook-pending" key={item.id}>
                <strong>{item.name}</strong>
                <p>{item.message}</p>
                <div>
                  <button type="button" onClick={() => approveMessage(item.id)}>
                    APPROVE
                  </button>
                  <button type="button" className="guestbook-delete" onClick={() => deleteMessage(item.id)}>
                    DELETE
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <>
            <button
              type="button"
              className="guestbook-admin-link"
              onClick={() => setShowLogin(value => !value)}
            >
              {showLogin ? 'CLOSE ADMIN LOGIN' : 'ADMIN LOGIN'}
            </button>

            {showLogin && (
              <form className="guestbook-login panel" onSubmit={login}>
                <span className="panel-tag">RESTRICTED ACCESS</span>
                <label htmlFor="admin-email">ADMIN EMAIL</label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
                <label htmlFor="admin-password">PASSWORD</label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                />
                <button type="submit" disabled={busy}>
                  {busy ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  )
}
