import { Router } from 'express';
import sgMail from '@sendgrid/mail';
import authorize from '../auth';
import { db } from '../db';

const router = Router();
const sendgridKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridKey);

function getSubsPromise() { return db.any('SELECT * FROM subscriptions'); }

router.get('/', authorize, async (req, res, next) => {
  try {
    const subs = await getSubsPromise();
    res.json({ subscriptions: subs });
  } catch (e) {
    next(e);
  }
});

router.post('/', authorize, async (req, res, next) => {
  try {
    const { body: { email } } = req;
    await db.none('INSERT INTO subscriptions(email) VALUES($1)', [email]);
    res.json({ status: 'ok' });
  } catch (e) {
    next(e);
  }
});

router.post('/publish', authorize, async (req, res, next) => {
  try {
    const { body: { subject, text } } = req;
    const subs = await getSubsPromise();
    const msgs = subs.map(({ email }) => (
      {
        to: email,
        from: 'noreply@svezhyvecer.by',
        subject,
        text,
      }
    ));
    await msgs.forEach((msg) => sgMail.send(msg));
    res.json({ status: 'ok' });
  } catch (e) {
    next(e);
  }
});

export default router;
