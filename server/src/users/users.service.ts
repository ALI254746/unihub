import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as puppeteer from 'puppeteer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }

  async findByGoogleId(googleId: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ googleId });
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findByStudentHemisId(studentHemisId: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ studentHemisId });
  }

  async findById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id);
  }

  async findLatest(): Promise<UserDocument | undefined> {
    return this.userModel.findOne().sort({ _id: -1 });
  }

  // --- SCRAPING LOGIC (PUPPETEER) ---
  async fetchHemisData(url: string) {
    console.log('🔹 Scraping HEMIS Data via Puppeteer:', url);
    let browser = null;
    try {
      // Launch browser (headless mode)
      browser = await puppeteer.launch({
        headless: true, // Set to false if you want to see the browser opening (for debugging)
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      
      const page = await browser.newPage();
      
      // Set User-Agent to look like a real browser
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      console.log('🔹 Navigating to page...');
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      
      console.log('✅ Page Loaded. Extracting data...');

      const result = await page.evaluate(() => {
        const data: any = {};
        const labelElements = document.querySelectorAll('.opacity-75'); 
        labelElements.forEach((el) => {
            const labelText = el.textContent.trim();
           const valueEl = el.nextElementSibling;
           if (valueEl) {
               const value = valueEl.textContent.trim();
               if (labelText.includes('Familiya')) data.fullName = value;
               if (labelText.includes('muassasi')) data.universityName = value;
               if (labelText.includes('Mutaxassislik')) data.specialty = value;
               if (labelText.includes('Fakultet')) data.faculty = value;
               
               // Bosqich (Course Level)
               if (labelText.includes('bosqichi') || labelText.includes('Kurs')) data.level = value;
               
               // Daraja (Degree - Bachelor/Master)
               if (labelText.includes('Daraja')) data.degree = value;
               
               // Education Type (Kunduzgi/Sirtqi)
               if (labelText.includes('Ta\'lim shakli') || labelText.includes('Talim shakli') || (labelText.includes('shakli') && !labelText.includes('To'))) data.educationType = value;
               
               // Payment Form (Grant/Contract)
               if (labelText.includes('To\'lov') || labelText.includes('To‘lov') || labelText.includes('Moliya')) data.paymentForm = value;
               
               if (labelText.includes('Guruh')) data.group = value;
               if (labelText.includes('ID')) data.hemisId = value;
           }
        });
        return data; 
      });

      console.log('✅ Extracted Data:', result);

      if (!result.fullName) {
         throw new Error('Ma\'lumotlar topilmadi. Sahifa tuzilishi o\'zgargan bo\'lishi mumkin.');
      }
      
      const studentHemisId = result.hemisId || url.split('/').pop(); 
      
      const finalData = {
        fullName: result.fullName,
        universityName: result.universityName,
        studentHemisId,
        studentData: {
            faculty: result.faculty,
            level: result.level,
            degree: result.degree, // Added
            specialty: result.specialty,
            educationType: result.educationType,
            paymentForm: result.paymentForm, // Added
            group: result.group,
        }
      };
      
      console.log('✅ Final Parsed Data (Puppeteer):', finalData);
      return finalData;

    } catch (error) {
      console.error('❌ Puppeteer Scraping Error:', error.message);
      throw new Error('HEMIS ma\'lumotlarini olib bo\'lmadi. Qayta urinib ko\'ring.');
    } finally {
      if (browser) await browser.close();
    }
  }

  async updateVerificationWithUrl(userId: string, hemisUrl: string) {
    const hemisData = await this.fetchHemisData(hemisUrl);

    const existingStudent = await this.findByStudentHemisId(hemisData.studentHemisId);
    if (existingStudent && existingStudent._id.toString() !== userId) {
      throw new ConflictException('Bu talaba guvohnomasi allaqachon boshqa foydalanuvchi tomonidan ro\'yxatdan o\'tkazilgan!');
    }

    return this.userModel.findByIdAndUpdate(
      userId,
      {
        isVerifiedStudent: true,
        studentHemisId: hemisData.studentHemisId,
        universityName: hemisData.universityName,
        fullName: hemisData.fullName, 
        studentData: hemisData.studentData,
      },
      { new: true },
    );
  }
  async updateAvatar(userId: string, avatarUrl: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, { avatarUrl }, { new: true });
  }
  async updateProfile(userId: string, updateData: any): Promise<UserDocument> {
    // Faqat ruxsat berilgan maydonlarni ajratib olamiz (Security)
    const safeUpdate = {
        ...(updateData.bio && { bio: updateData.bio }),
        ...(updateData.location && { location: updateData.location }),
        ...(updateData.skills && { skills: updateData.skills }),
        ...(updateData.socials && { socials: updateData.socials }),
        ...(updateData.timeline && { timeline: updateData.timeline }),
    };

    return this.userModel.findByIdAndUpdate(userId, safeUpdate, { new: true });
  }

  async updateCV(userId: string, cvUrl: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, { cvUrl }, { new: true });
  }
}
