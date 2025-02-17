class Character {
	// TODO: remove unnecessary arguments from the constructor. 
	constructor(tid, tx, ty, tpx, tpy, tvx, tvy, tonob, tdire, tcarry, tcarryObject, tcarriedBy, tlandTimer, tdeathTimer, tcharState, tstandingOn, tstoodOnBy, tw, th, tweight, tweight2, th2, tatEnd, tfriction, tfricGoal, tjustChanged, tspeed, tbuttonsPressed, tpcharState, tsubmerged, ttemp, theated, theatSpeed, thasArms) {
		this.id = tid;
		this.x = tx;
		this.y = ty;
		this.px = tx;
		this.py = ty;
		this.vx = tvx;
		this.vy = tvy;
		this.onob = tonob;
		this.dire = tdire;
		this.carry = tcarry;
		this.carryObject = tcarryObject;
		this.carriedBy = tcarriedBy;
		this.landTimer = tlandTimer;
		this.deathTimer = tdeathTimer;
		this.charState = tcharState;
		this.standingOn = tstandingOn;
		this.stoodOnBy = tstoodOnBy;
		this.w = tw;
		this.h = th;
		this.weight = tweight;
		this.weight2 = tweight2;
		this.h2 = th2;
		this.atEnd = tatEnd;
		this.friction = tfriction;
		this.fricGoal = tfricGoal;
		this.justChanged = tjustChanged;
		this.speed = tspeed;
		this.buttonsPressed = tbuttonsPressed;
		this.pcharState = tpcharState;
		this.submerged = tsubmerged;
		this.temp = ttemp;
		this.heated = theated;
		this.heatSpeed = theatSpeed;
		this.hasArms = thasArms;

		this.frame = 3;
		this.poseTimer = 0;
		this.leg1frame = 0;
		this.leg2frame = 0;
		this.legdire = 0;
		this.leg1skew = 0;
		this.leg2skew = 0;
		this.legAnimationFrame = [0,0]; // Animation offset.
		this.burstFrame = -1;
		this.diaMouthFrame = 0;
		this.expr = 0;
	}

	applyForces(grav, control, waterUpMaxSpeed)
	{
		var _loc2_ = undefined;
		if(grav >= 0)
		{
			_loc2_ = Math.sqrt(grav);
		}
		if(grav < 0)
		{
			_loc2_ = - Math.sqrt(- grav);
		}
		if(!this.onob && this.submerged != 1)
		{
			this.vy = Math.min(this.vy + _loc2_,25);
		}
		if(this.onob || control)
		{
			this.vx = (this.vx - this.fricGoal) * this.friction + this.fricGoal;
		}
		else
		{
			this.vx *= 1 - (1 - this.friction) * 0.12;
		}
		if(Math.abs(this.vx) < 0.01)
		{
			this.vx = 0;
		}
		if(this.submerged == 1)
		{
			this.vy = 0;
			if(this.weight2 > 0.18)
			{
				this.submerged = 2;
			}
		}
		else if(this.submerged >= 2)
		{
			if(this.vx > 1.5)
			{
				this.vx = 1.5;
			}
			if(this.vx < -1.5)
			{
				this.vx = -1.5;
			}
			if(this.vy > 1.8)
			{
				this.vy = 1.8;
			}
			if(this.vy < - waterUpMaxSpeed)
			{
				this.vy = - waterUpMaxSpeed;
			}
		}
	}
	charMove() {
		this.y += this.vy;
		this.x += this.vx;
	}
	moveHorizontal(power) {
		if (power * this.fricGoal <= 0 && !this.onob)
		{
			this.fricGoal = 0;
		}
		this.vx += power;
		if(power < 0)
		{
			this.dire = 1;
		}
		if(power > 0)
		{
			this.dire = 3;
		}
		this.justChanged = 2;
	}
	stopMoving() {
		if(this.dire == 1)
		{
			this.dire = 2;
		}
		if(this.dire == 3)
		{
			this.dire = 4;
		}
	}

	jump(jumpPower) {
		this.vy = jumpPower;
	}

	swimUp(jumpPower)
	{
		this.vy -= this.weight2 + jumpPower;
	}

	setFrame(newFrame) {
		if (newFrame != this.frame) {
			if (!((this.frame == 5 && newFrame == 4) || (this.frame == 4 && newFrame == 5))) this.poseTimer = 0;
			this.frame = newFrame;
		}
	}
}
